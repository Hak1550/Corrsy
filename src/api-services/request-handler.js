import { del, get, patch, post, put } from "./http-provider";
import featureConstants from "./feature-constants";

const SERVICE_URLS = {
  // service URL's (API End-Points)
  //Just Like That

  // Auth Management
  login: "user/login",
  signup: "user",

  // Product Management
  getProducts: "category/products?categoryId=",

  // Category Management
  getCategories: "category",

  // Blog Management
  getBlogs: "article",

  // Cart Management
  getCart: "cart/",
  updateCart: "cart/update",
  deleteCart: "cart/remove-item",
  addCart: "cart",

  // Profile Management
  editProfile: "user/update-profile/",
  uploadImage: "user/upload-image/",

  // Book Management
  getBooks: "category/products?categoryId=",

  // Search Management
  getSearchedProducts: "category/search-products?search=",

  // Perios Management
  getCycles: "cycle/",
  getLastCycle: "cycle/last/",
  addCycle: "cycle",
  updateCycle: "cycle/",
  getCycleStates: "cycle/stats/",
  getCycleCurrentMonth: "cycle/current-month/",
  getattributes: "attributes",
  addDailyEntry: "daily-entry",
  getdailyEntry: "daily-entry",

  // Pregnancy Management
  getTracker: "tracker/",
  addTracker: "tracker",
  updateTracker: "tracker/",
  getTrackerStates: "tracker/stats/",

  // Map management
  getmap :"AIzaSyDrhQJcL233a_QjB-rxXRLwNdqQz4y0YAI" 


};

//Auth Management
const login = (data) => post(SERVICE_URLS.login, data);
const signup = (data) => post(SERVICE_URLS.signup, data);

// Product Management
const getProducts = (params) =>
  get(
    `${SERVICE_URLS.getProducts}${params}`,
    {},
    { feature: featureConstants.static }
  );

// Service Management
const getCategories = () =>
  get(SERVICE_URLS.getCategories, {}, { feature: featureConstants.static });

// Blog Management
const getBlogs = () =>
  get(SERVICE_URLS.getBlogs, {}, { feature: featureConstants.static });

// Cart Management
const getCart = (params) =>
  get(
    `${SERVICE_URLS.getCart}${params}`,
    {},
    { feature: featureConstants.static }
  );
const addCart = (data) => post(SERVICE_URLS.addCart, data);
const deleteCart = (data) => put(SERVICE_URLS.deleteCart, data);
const updateCart = (data) => put(SERVICE_URLS.updateCart, data);

//Profile Management
const editProfile = (data, params) =>
  put(`${SERVICE_URLS.editProfile}${params}`, data, false, {
    feature: featureConstants.static,
  });

const uploadImage = (data, params) =>
  put(`${SERVICE_URLS.uploadImage}${params}`, data, true, {
    feature: featureConstants.static,
  });

// Books Management
const getBooks = (params) =>
  get(
    `${SERVICE_URLS.getBooks}${params}`,
    {},
    { feature: featureConstants.static }
  );

// Search Management
const getSearchedProducts = (params) =>
  get(
    `${SERVICE_URLS.getSearchedProducts}${params}`,
    {},
    { feature: featureConstants.static }
  );

// Cycle Management
const getCycles = () =>
  get(`${SERVICE_URLS.getCycles}`, {}, { feature: featureConstants.static });
const getLastCycle = () =>
  get(`${SERVICE_URLS.getLastCycle}`, {}, { feature: featureConstants.static });

const getCycleCurrentMonth = () =>
  get(
    `${SERVICE_URLS.getCycleCurrentMonth}`,
    {},
    { feature: featureConstants.static }
  );

const getCycleStates = () =>
  get(
    `${SERVICE_URLS.getCycleStates}`,
    {},
    { feature: featureConstants.static }
  );
const addCycle = (data) => post(SERVICE_URLS.addCycle, data);
const updateCycle = (data) => put(`${SERVICE_URLS.updateCycle}`, data);
const getattributes = () =>
  get(
    `${SERVICE_URLS.getattributes}`,
    {},
    { feature: featureConstants.static }
  );

const addDailyEntry = (data) => post(SERVICE_URLS.addDailyEntry, data);
const getdailyEntry = () =>
  get(
    `${SERVICE_URLS.getdailyEntry}`,
    {},
    { feature: featureConstants.static }
  );

// Tracker Management
const getTracker = () =>
  get(`${SERVICE_URLS.getTracker}`, {}, { feature: featureConstants.static });

const getTrackerStates = () =>
  get(
    `${SERVICE_URLS.getTrackerStates}`,
    {},
    { feature: featureConstants.static }
  );

const addTracker = (data) => post(SERVICE_URLS.addTracker, data);

const updateTracker = (data) => put(`${SERVICE_URLS.updateTracker}`, data);


const apiServices = {
  // define variables

  // Auth Management
  login,
  signup,

  // Product Management
  getProducts,

  // Category Management
  getCategories,

  // BLogs Management
  getBlogs,

  // Cart Management
  getCart,
  addCart,
  updateCart,
  deleteCart,

  //  Profile Management
  editProfile,
  uploadImage,

  // Book Management
  getBooks,

  // Search Management
  getSearchedProducts,

  // Cycle Management
  getCycles,
  getLastCycle,
  getCycleStates,
  addCycle,
  updateCycle,
  getCycleCurrentMonth,
  getattributes,
  addDailyEntry,
  getdailyEntry,

  /// Tracker Management
  getTracker,
  addTracker,
  updateTracker,
  getTrackerStates,


};

export default apiServices;
