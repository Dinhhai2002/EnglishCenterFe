import BaseApiService from "./BaseApiService";

class PostApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }
  public async getAll(
    categoryBlogId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/post`, {
        params: {
          category_blog_id: categoryBlogId,
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/post/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async create(
    title: string,
    description: string,
    content: string,
    category_blog_id: number,
    status: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/post/create`, {
        title: title,
        description: description,
        content: content,
        category_blog_id: category_blog_id,
        status: status,
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async uploadBanner(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await this.api.post(
        `/post/${id}/upload-banner`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const postApiService = new PostApiService(token);
export default postApiService;
