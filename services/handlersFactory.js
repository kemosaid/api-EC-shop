const apiFeatures = require("../utils/apiFeatures"),
  ApiError = require("../utils/Apierror"),
  asynchandler = require("express-async-handler");
exports.deleteOne = (model) =>
  asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndRemove(id);
    if (!document) {
      return next(new ApiError(`there is no document with this id ${id}`, 404));
    }
    res.status(204).json({ msg: "document removed successfully" });
  });
exports.ubdateOne = (model) =>
  asynchandler(async (req, res, next) => {
    const document = await model.findOneAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`there is no document with this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (model) =>
  asynchandler(async (req, res) => {
    const document = await model.create(req.body);
    res.status(200).json({ data: document });
  });

exports.getOne = (model) =>
  asynchandler(async (req, res, next) => {
    const id = req.params.id;
    const document = await model.findById(id);
    if (!document) {
      return next(new ApiError(`there is no document with this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
exports.getAll = (model, modelName = "") =>
  asynchandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await model.countDocuments();
    const apiFeature = new apiFeatures(model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeature;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
