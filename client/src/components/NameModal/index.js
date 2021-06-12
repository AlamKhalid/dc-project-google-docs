import { Col, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ICOLOR } from "../../constants";
import actions from "../../redux/actions";
import { CustomButton } from "../Reusable/Buttons";
import { CustomH6 } from "../Reusable/Typography";
import { CustomRow } from "../Reusable/Utilities";

const { triggerNameModal } = actions;

const CustomCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomHeading = styled.h2`
  font-family: "Poppins-SemiBold";
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 0;
`;

const InputCol = styled(Col)`
  input {
    border-radius: 5px;
    padding: 10px 15px;
  }
`;

const ModalFooter = ({ trigger, username, code }) => {
  const documentId = useSelector((state) => state.modals.documentId);

  return (
    <CustomRow>
      <CustomCol span={24}>
        <CustomButton
          background={ICOLOR.orange}
          borderRadius
          textColor={ICOLOR.white}
          onClick={() => {
            if (username) {
              if (code) {
                window.open(
                  `https://thirsty-khorana-bf73f0.netlify.app/documents/${code}?name=${username}`
                );
              } else {
                window.open(
                  `https://thirsty-khorana-bf73f0.netlify.app/${uuidv4()}?name=${username}`
                );
              }
            } else {
              window.alert(`Please enter username`);
            }
          }}
        >
          {documentId !== null ? "Edit Document" : "Create Document"}
        </CustomButton>
        <CustomButton background={ICOLOR.white} borderRadius onClick={trigger}>
          Cancel
        </CustomButton>
      </CustomCol>
    </CustomRow>
  );
};

const CustomTitle = () => {
  return (
    <CustomRow>
      <Col span={24}>
        <CustomHeading>New user?</CustomHeading>
      </Col>
    </CustomRow>
  );
};

function NameModal() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const visible = useSelector((state) => state.modals.nameModal);
  const documentId = useSelector((state) => state.modals.documentId);
  useEffect(() => {
    setCode(documentId);
  }, [documentId]);
  const dispatch = useDispatch();
  const trigger = () => {
    dispatch(triggerNameModal());
  };
  return (
    <Modal
      title={<CustomTitle />}
      centered={true}
      visible={visible}
      onCancel={trigger}
      closable={false}
      footer={<ModalFooter trigger={trigger} username={username} code={code} />}
    >
      <CustomRow marginbottom="1rem">
        <Col span={24}>
          <CustomH6>Please enter your name</CustomH6>
        </Col>
      </CustomRow>
      <CustomRow marginbottom={documentId !== null ? "1rem" : "0rem"}>
        <InputCol span={24}>
          <Input
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputCol>
      </CustomRow>
      {documentId !== null ? (
        <CustomRow>
          <InputCol span={24}>
            <Input
              placeholder="Code"
              disabled={documentId !== ""}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </InputCol>
        </CustomRow>
      ) : null}
    </Modal>
  );
}

export default NameModal;
