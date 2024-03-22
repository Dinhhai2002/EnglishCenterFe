import BaseApiService from "./BaseApiService";

class CategoryBlogApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }
  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(`/category-blog`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const categoryBlogApiService = new CategoryBlogApiService(token);
export default categoryBlogApiService;
