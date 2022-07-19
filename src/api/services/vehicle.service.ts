import axios from "axios";
import { Service } from "typedi";
import { getError } from "../../utils/error";
import { constants } from "../../common/constants";

@Service()
export class VehicleService {
  async validateVIN(vin: string) {
    try {
      const url = `${constants.NHTSA.API}${vin}?${constants.NHTSA.DATA_FORMAT_QUERY}`;
      const { data, status } = await axios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });
      if (status != 200) {
        throw new Error("VehicleService failed to validateVIN");
      }
      if (data.Results[0].ErrorCode !== "0") {
        return false;
      }
      return true;
    } catch (error: unknown) {
      throw getError(error);
    }
  }
}
