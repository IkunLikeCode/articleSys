import { useState } from "react";
import InterviewForm from "./components/interviewForm";
import { fetchAddInterview } from "../../store/module/interview/interview";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { message } from "antd";
import { useNavigate } from "react-router";
interface IForm {
  interviewTitle: string;
  interviewContent: string;
  typeId: string;
}
function AddInterview() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formInfo, setFormInfo] = useState<IForm>({
    interviewTitle: "",
    interviewContent: "",
    typeId: "",
  });
  const submitHandler = (info: IForm) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchAddInterview(info)).then((res: any) => {
      if (res.payload.code === 0) {
        message.success("添加成功");
        navigate("/interview/interviewList");
      }
    });
  };
  return (
    <div className="addinterview_container">
      <InterviewForm
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        submitHandler={submitHandler}
        addOrEdit="add"></InterviewForm>
    </div>
  );
}

export default AddInterview;
