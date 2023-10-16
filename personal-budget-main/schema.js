const mongoose = require('mongoose');

function isHexColorCode(value) {
  return /^#([0-9A-Fa-f]{6})$/.test(value);
}

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, budget: {
    type: Number,
    required: true,
    },
  color: {
    type: String,
    required: true,
    validate: {
      validator: isHexColorCode,
      message:"data must be of at least 6 digits (hexadecimal format. (eg: #ED4523)).",
    },
    
  },
});

const CustomData = mongoose.model('CustomData', dataSchema);

module.exports = CustomData;
