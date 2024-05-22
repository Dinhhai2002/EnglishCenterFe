import handleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

const prefix = "authentication";

class AuthenticationApiService extends BaseApiService {
  public async Login(user_name: any, password: any): Promise<any> {
    try {
      const response = await this.api.post(
        `${process.env.REACT_APP_URL_LOGIN}`,
        {
          user_name,
          password,
        }
      );
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async LoginGoogle(
    email: any,
    image_url: any,
    fullname: any
  ): Promise<any> {
    try {
      const response = await this.api.post(
        `${process.env.REACT_APP_URL_LOGIN_GOOGLE}`,
        {
          email,
          image_url,
          fullname,
        }
      );
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async Register(
    user_name: any,
    full_name: any,
    email: any,
    gender: any,
    phone: any,
    password: any,
    birthday: any,
    city_id: any,
    district_id: any,
    ward_id: any,
    full_address: any
  ): Promise<any> {
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_REGISTER}`,
        {
          user_name,
          full_name,
          email,
          gender,
          phone,
          password,
          birthday,
          city_id,
          district_id,
          ward_id,
          full_address,
        }
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async OtpRegister(
    user_name: any,
    full_name: any,
    email: any,
    phone: any,
    password: any,
    gender: number,
    birthday: any,
    ward_id: number,
    district_id: number,
    city_id: number,
    full_address: any
  ): Promise<any> {
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_OTP_REGISTER}`,
        {
          user_name,
          full_name,
          email,
          phone,
          password,
          gender,
          birthday,
          ward_id,
          district_id,
          city_id,
          full_address,
        }
      );

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async OtpForgot(user_name: any, email: any): Promise<any> {
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_OTP_FORGOT_PASSWORD}`,
        {
          user_name,
          email,
        }
      );

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async confirmOtp(
    user_name: any,
    email: any,
    otp: number,
    type: number
  ): Promise<any> {
    try {
      const response: any = await this.api.post(`/${prefix}/confirm-otp`, {
        user_name,
        email,
        otp,
        type,
      });

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async resetPassword(
    user_name: any,
    new_password: any,
    confirm_password: any
  ): Promise<any> {
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_RESETPASSWORD}`,
        {
          user_name,
          new_password,
          confirm_password,
        }
      );

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllCity(): Promise<any> {
    try {
      const response: any = await this.api.get(
        `${process.env.REACT_APP_URL_GET_ALL_CITY}`
      );

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findDistrictByCityId(id: number): Promise<any> {
    try {
      const response: any = await this.api.get(
        `/${prefix}/${id}/get-district-by-city`
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findWardByDistrictId(id: number): Promise<any> {
    try {
      const response: any = await this.api.get(
        `/${prefix}/${id}/get-ward-by-district`
      );

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllCourse(
    categoryCourseId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/list-course`, {
        params: {
          category_course_id: categoryCourseId,
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit,
        },
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllExam(
    categoryExamId: number,
    topicExamId: number,
    status: number,
    keySearch: string,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/list-exam`, {
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
      throw error;
    }
  }

  public async getAllTopic(): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/list-topic`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllCategoryExam(): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/list-category-exam`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDetailExam(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/exam/${id}/detail`);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async countUserExam(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/exam/${id}/count-user`);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async countCommentsByExamId(exam_id: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/comments/count-by-exam`, {
        params: {
          exam_id: exam_id,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async getDetailCourse(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/course/${id}`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getCommentsByExamId(exam_id: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/comments/get-by-exam`, {
        params: {
          exam_id: exam_id,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async findOneLessons(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/lessons/${id}/detail`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllPost(
    userId?: number,
    categoryBlogId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/post`, {
        params: {
          user_id: userId,
          category_blog_id: categoryBlogId,
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async findOnePost(id: number, isAuthorize?: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/post/${id}`, {
        params: {
          is_authorize: isAuthorize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getAllCategoryBlog(status?: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/category-blog`, {
        params: {
          status: status,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllCategoryCourse(
    key_search: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    var messageError = "";
    try {
      const response = await this.api.get(`/${prefix}/category-course`, {
        params: {
          key_search: key_search,
          status: status,
          page: page,
          limit: limit,
        },
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error(messageError);
    }
  }

  public async getAllBanner(
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/banner`, {
        params: {
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
}

const authenticationApiService = new AuthenticationApiService();
export default authenticationApiService;
