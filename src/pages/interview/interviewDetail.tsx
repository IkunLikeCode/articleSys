import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchGetInterviewById } from "../../store/module/interview/interview";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { IForm } from "../../store/module/interview/type";
function InterviewDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const [formInfo, setFormInfo] = useState<IForm>({
    interviewTitle: "",
    interviewContent: "",
    typeId: "",
  });
  useEffect(() => {
    if (param.interviewId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchGetInterviewById(param.interviewId)).then((res: any) => {
        if (res.payload.code === 0) {
          setFormInfo({
            interviewTitle: res.payload.data.interviewTitle,
            interviewContent: res.payload.data.interviewContent,
            typeId: res.payload.data.typeId,
          });
        }
      });
    }
  }, [dispatch, param.interviewId]);
  return (
    <div>
      <div
        style={{
          width: "100%",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          color: "#000",
        }}>
        {formInfo.interviewTitle}
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
        }}
        dangerouslySetInnerHTML={{ __html: formInfo.interviewContent }}></div>
    </div>
  );
}

export default InterviewDetail;
