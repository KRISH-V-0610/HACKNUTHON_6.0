import mongoose from 'mongoose';

const predictSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    unique: true // Ensures one-to-one relationship
  },
  latestSkinImage: {
    type: String,
    required: true,
    validate: {
      validator: function(url) {
        // Basic URL validation regex
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  remarks: {
    type: String,
    default: '' // Optional field that defaults to null
  }
}, { 
  timestamps: true
});

const Predict = mongoose.model('Predict', predictSchema);
export default Predict;