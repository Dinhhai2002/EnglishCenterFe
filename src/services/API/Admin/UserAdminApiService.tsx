import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class UserAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    key_search: any,
    status: number,
    role: number,
    page: number,
    limit: number
  ): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.get(`/admin/user`, {
        params: {
          key_search: key_search,
          status: status,
          role: role,
          page: page,
          limit: limit
        }
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/admin/user/${id}/change-status`);

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
const token = localStorage.getItem('token');

const userAdminApiService = new UserAdminApiService(token);
export default userAdminApiService;
