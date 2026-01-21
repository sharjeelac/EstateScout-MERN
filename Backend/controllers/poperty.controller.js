import Post from "../models/property.model.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      amenities,
      area,
      price,
      location,
      images,
      thumbail,
      owner,
    } = req.body;

    if (!req.files || !req.files["thumbnail"] || !req.files["images"]) {
      return res
        .status(400)
        .json({ message: "thumbnail and images are required" });
    }

    const imagePaths = req.files["images"].map((file) => file.path);
    const thumbnailPath = req.files["thumbnail"][0].path;

    const post = new Post.create({
      title,
      description,
      type,
      amenities,
      area,
      price,
      location,
      images,
      thumbail,
      owner,
      images: imagePaths,
      thumbnail: thumbnailPath,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProperties = async (req, res) => {
  try {

    const { searh, type, location, maxPrice, minPrice } = req.query
    let queryObject = {}
    if (searh) {
      queryObject = {
        $or: [
          { title: { $regex: searh, $options: "i" } },
          { location: { $regex: searh, $options: "i" } },
          { type: { $regex: searh, $options: "i" } },
        ]
      }
    }

    if (type) {
      queryObject.type = type
    }
    if (location) {
      queryObject.location = { $regex: location, $options: "i" }
    }
    if (maxPrice || minPrice) {
      queryObject.price = {}
      if (maxPrice) {
        queryObject.price.$lte = Number(maxPrice)
      }
      if (minPrice) {
        queryObject.price.$gte = Number(minPrice)
      }
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit


    console.log("Final Query Object:", queryObject);

    const properties = await Post.find(queryObject).skip(skip).limit(limit);

    const total = await Post.countDocuments(queryObject)

    res.status(200).json({
      sucess: true,
      properties,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "owner",
      "name email profilePicture",
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post
export const deleteProperty = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
