import { Button, Form, FormInstance, Input, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../../../store/module/type/typeStore";
import { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../../store";
import { rootReducer } from "../../../store/type";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";
interface IForm {
  interviewTitle: string;
  interviewContent: string;
  typeId: string;
}
interface IProps {
  addOrEdit: "add" | "edit";
  submitHandler: (data: IForm) => void;
  formInfo: IForm;
  setFormInfo: React.Dispatch<React.SetStateAction<IForm>>;
}
function InterviewForm(props: IProps) {
  const { submitHandler, addOrEdit, formInfo, setFormInfo } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { typeList } = useSelector((state: rootReducer) => state.type);
  const [html, setHtml] = useState("");
  const formRef = useRef<FormInstance<IForm>>(null);
  // 改变题目类型
  const handleChange = (value: string) => {
    setFormInfo({
      ...formInfo,
      typeId: value,
      interviewContent: html,
    });
  };

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
  };
  // 提交
  const finishHandle = (data: IForm) => {
    if (addOrEdit === "add") {
      data.interviewContent = html;
      data.interviewTitle = formInfo.interviewTitle;
      data.typeId = formInfo.typeId;
      if (!data.typeId) {
        message.error("请选择题目类型");
        return;
      }
      submitHandler(data);
    }
    if (addOrEdit === "edit") {
      data.interviewContent = html;
      data.interviewTitle = formInfo.interviewTitle;
      data.typeId = formInfo.typeId;
      if (!data.typeId) {
        message.error("请选择题目类型");
        return;
      }
      submitHandler(data);
    }
  };
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (typeList.data.length === 0) {
      dispatch(getTypeList());
    }
  }, [dispatch, typeList.data.length]);

  useEffect(() => {
    if (addOrEdit === "edit") {
      if (formRef.current) {
        formRef.current.setFieldsValue(formInfo);
      }
    }
  }, [addOrEdit, formInfo]);
  return (
    <div className="interviewform_container">
      <Form
        ref={formRef}
        name="formInfo"
        labelCol={{ span: 2 }}
        onFinish={finishHandle}>
        <Form.Item
          name="interviewTitle"
          rules={[{ required: true, message: "标题是必填的" }]}
          label="题目标题">
          <Input
            value={formInfo.interviewTitle}
            onChange={(e) => {
              setFormInfo({
                ...formInfo,
                interviewTitle: e.target.value,
              });
            }}></Input>
        </Form.Item>

        <Form.Item label="题目内容">
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={formInfo.interviewContent}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </Form.Item>
        <Form.Item label="题目类型">
          <Select
            placeholder="请选择题目类型"
            style={{ width: 320 }}
            onChange={handleChange}
            value={formInfo.typeId}
            options={[
              ...typeList.data.map((item) => {
                return {
                  value: item._id,
                  label: item.typeName,
                };
              }),
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {addOrEdit === "add" ? "添加" : "编辑"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InterviewForm;
