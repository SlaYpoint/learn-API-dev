const ErrorRespose = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const path = require("path");

// @desc : get all bootcamps
// @route : GET /api/v1/bootcamps
// @access : Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  // Fields to excluse 
  const removeFields = ['select','sort','page','limit'];

  // Loop over removeField and ddlete them from reQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create opeartprs ($gt, $gte, etc)
  queryStr =  queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  
  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select queries
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  
  // Sort queries
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Exceuting query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }
  
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
 
});

// @desc : gets specific bootcamp
// @route : GET /api/v1/bootcamps/:id
// @access : Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      // when ID is well formatted BUT not in db
      return next(
        new ErrorRespose(`Bootcamp not found with id of ${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  
});

// @desc : create bootcamp
// @route : POST /api/v1/bootcamps
// @access : Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
    
    // If user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
      return next(new ErrorRespose(`The user with ID ${req.user.id} has already published a bootcamp`, 400));
    }
  
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  
});

// @desc : update bootcamp
// @route : PUT /api/v1/bootcamps/:id
// @access : Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorRespose(`Bootcamp not found with id of ${req.params.id}`, 400)
      );
    }
    
    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
      return next(
          new ErrorRespose(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }
    
    // Update changes in DB
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  
});

// @desc : delete bootcamp
// @route : DELETE /api/v1/bootcamps/:id
// @access : Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorRespose(`Bootcamp not found with id of ${req.params.id}`, 400)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorRespose(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });

});


// @desc : Upload photo for bootcamp
// @route : PUT /api/v1/bootcamps/:id/photo
// @access : Private
exports.bootcampPhotoUplaod = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorRespose(`Bootcamp not found with id of ${req.params.id}`, 400)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorRespose(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }
  
  if (!req.files) {
    return next(new ErrorRespose(`PLease upload a file`, 400));
  }

  // console.log(req.files.file);
  const file = req.files.file;

  // Make sure file is an image
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorRespose(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorRespose(
        `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorRespose(`Problem with file upload`, 400));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
