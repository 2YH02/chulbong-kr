import instance from "../instance";

interface Props {
  email: string;
  code: string;
}

const verifyCode = async ({ email, code }: Props): Promise<string> => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("token", code);

  const res = await instance.post(
    `/api/v1/auth/verify-email/confirm`,
    formData
  );

  return res.data;
};

export default verifyCode;
