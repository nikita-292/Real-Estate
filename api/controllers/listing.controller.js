import  Listing  from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id); 

    if (!listing) {
      return next(errorHandler(404, 'Listing not found!')); //listing hi nhi hai th 
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Listing deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
//  { new: true } for gettiing the updated listing back

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
}
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    // filter if there is a query then limit lga sakte 
    // for offer or furnished  === search inside the database  for both true or false 
   const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || ''; //query di tohh ya blank

    const sort = req.query.sort || 'createdAt'; //pahle sort kro query kro or kuch na diya toh created time ke according krdo

    const order = req.query.order || 'desc';//order ke according wrna desc mein

    const listings = await Listing.find({ //get the lsiting
      name: { $regex: searchTerm, $options: 'i' }, //regex functionaltiy for mongodb helps search for words ****option=i*** matlab lowercase and uppdercasse nhi dekhaega 

      offer, //search for all order furnsiht tyep etc
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order }) //we wanna sort it on the  taken  order
      .limit(limit) //and we limit and 
      .skip(startIndex); //agar limit 9 and idex is 0 toh start 9 show krega warna 1 toh skip frist 9    

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};