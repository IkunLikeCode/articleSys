import { Button, Form, FormInstance, Input, Select, Upload } from "antd";
import type { IFormDataBook } from "../type";
import React, { useEffect, useRef, useState } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../store/type";
import { getTypeList } from "../../../store/module/type/typeStore";
import { AppDispatch } from "../../../store";
interface IProps {
  bookInfo: IFormDataBook;
  setBookInfo: React.Dispatch<React.SetStateAction<IFormDataBook>>;
  handleSubmit: (value: IFormDataBook) => void;
  addOrEdit: "add" | "edit";
}
function BookForm(props: IProps) {
  // 表单ref
  const formRef = useRef<FormInstance>(null);
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { typeList } = useSelector((state: rootReducer) => state.type);
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 编辑器内容
  const [html, setHtml] = useState("");
  // 图片封面
  const [imageUrl, setImageUrl] = useState<string>("");
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };
  const { bookInfo, handleSubmit } = props;
  const finish = (value: IFormDataBook) => {
    value.bookIntro = html;
    handleSubmit(value);
  };
  // 上传按钮
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
    </button>
  );
  // 上传图片
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadHandle = (info: { file: any }) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.data);
      props.setBookInfo({
        ...bookInfo,
        bookPic: info.file.response.data!,
      });
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
    if (!typeList.data.length) {
      dispatch(getTypeList());
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (props.addOrEdit === "edit") {
        formRef.current?.setFieldsValue(bookInfo);
        setHtml(bookInfo.bookIntro);
        setImageUrl(bookInfo.bookPic);
      }
    }, 0);
  }, [bookInfo, props.addOrEdit]);
  return (
    <div className="BookForm_container">
      <Form
        ref={formRef}
        onFinish={finish}
        initialValues={bookInfo}
        labelCol={{ span: 3 }}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "请输入书籍标题",
            },
          ]}
          name={"bookTitle"}
          style={{ width: "600px" }}
          label="书籍标题">
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </Form.Item>
        <Form.Item
          style={{ width: "600px" }}
          label="下载链接"
          name={"downloadLink"}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="所需积分" style={{ width: "600px" }}>
          <Select
            style={{ width: 200 }}
            placeholder="请选择所需积分"
            value={bookInfo?.requirePoints}
            onChange={(value) => {
              props.setBookInfo({
                ...bookInfo,
                requirePoints: value,
              });
            }}
            options={[
              { value: 30, label: "30" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
            ]}
          />
        </Form.Item>
        <Form.Item label="书籍类型" style={{ width: "600px" }}>
          <Select
            style={{ width: 200 }}
            placeholder="请选择书籍类型"
            value={bookInfo?.typeId}
            onChange={(value) => {
              props.setBookInfo({
                ...bookInfo,
                typeId: value,
              });
            }}
            options={[
              ...typeList.data.map((item) => {
                return {
                  label: item.typeName,
                  value: item._id,
                };
              }),
            ]}
          />
        </Form.Item>
        <Form.Item label="书籍封面" style={{ width: "600px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={uploadHandle}
            action="/api/upload">
            {imageUrl ? (
              <img
                src={"http://127.0.0.1:7001" + imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default BookForm;
