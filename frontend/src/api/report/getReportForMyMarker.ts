import instance from "../instance";

export interface Report {
  reportID: number;
  description: string;
  status: string;
  createdAt: string;
  photos: string[];
}

interface Marker {
  [key: string]: Report[];
}

export interface MyMarkerReportRes {
  totalReports: number;
  markers: Marker;
}

const getReportForMyMarker = async (): Promise<MyMarkerReportRes> => {
  const res = await instance.get(`/api/v1/users/reports/for-my-markers`);

  return res.data;
};

export default getReportForMyMarker;
