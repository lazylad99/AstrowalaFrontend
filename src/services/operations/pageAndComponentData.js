import axios from 'axios';

const CATALOGPAGEDATA_API = 'http://localhost:5000/api/v1/course/getCategoryPageDetails';

// ================ get Catalog Page Data ================
export const getCatalogPageData = async (categoryId) => {
  let result = [];
  try {
    const response = await axios.post(CATALOGPAGEDATA_API, { categoryId });
    console.log("CATALOGPAGEDATA_API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data");
    }

    console.log("CATALOG PAGE DATA API RESPONSE............", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    result = error.response?.data?.data || {};
  }
  return result;
};
