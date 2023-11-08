import BaseApiService from "./BaseApiService";

class ExamApiService extends BaseApiService {
  private token: string | null;

  constructor(token?: any) {
    super(token);
    this.token = token || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.updateAuthorizationHeader();
  }

  public async getAll(
    categoryExamId: number,
    topicExamId: number,
    status: number,
    keySearch: string,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/exam`, {
        params: {
          category_exam_id: categoryExamId,
          topic_exam_id: topicExamId,
          status: status,
          key_search: keySearch,
          page,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getAudioByExamId(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/exam/${id}/get-audio`);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  private updateAuthorizationHeader() {
    if (this.token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${this.token}`;
    } else {
      delete this.api.defaults.headers["Authorization"];
    }
  }
}
const token = localStorage.getItem("token");

const examApiService = new ExamApiService(token);
export default examApiService;
