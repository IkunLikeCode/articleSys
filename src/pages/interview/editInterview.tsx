/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IForm } from "../../store/module/interview/type";
import InterviewForm from "./components/interviewForm";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  fetchGetInterviewById,
  fetchEditInterview,
} from "../../store/module/interview/interview";
import type { AppDispatch } from "../../store";
import { message } from "antd";
function EditInterview() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    state: { interviewId },
  } = useLocation();
  const [formInfo, setFormInfo] = useState<IForm>({
    interviewTitle: "",
    interviewContent: "",
    typeId: "",
  });

  // 编辑面试
  const submitHandler = (info: IForm): void => {
    dispatch(
      fetchEditInterview({
        info,
        id: interviewId,
      })
    ).then((res: any) => {
      if (res.payload.code === 0) {
        message.success("编辑面试题目成功");
        navigate("/interview/interviewList");
      }
    });
  };

  // 获取面试题目详情
  useEffect(() => {
    if (interviewId) {
      dispatch(fetchGetInterviewById(interviewId)).then((res: any) => {
        if (res.payload.code === 0) {
          setFormInfo({
            interviewTitle: res.payload.data.interviewTitle,
            interviewContent: res.payload.data.interviewContent,
            typeId: res.payload.data.typeId,
          });
        }
      });
    }
  }, [dispatch, interviewId]);
  return (
    <InterviewForm
      addOrEdit="edit"
      formInfo={formInfo}
      setFormInfo={setFormInfo}
      submitHandler={submitHandler} // 此处为了防止报错，暂时写一个空函数，后面再完善
    ></InterviewForm>
  );
}

export default EditInterview;
