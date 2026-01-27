/* eslint-disable @typescript-eslint/no-explicit-any */
import { SaveButton, useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

import { getNameInitials } from "@/utils";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations";

import { Text, CustomAvatar } from "@/components";

import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types";
import { AccountSettingsProps } from "@/utils/interfaces";

const AccountSettings = ({ open, setOpen, userId }: AccountSettingsProps) => {
  const formValues = useForm<
    UpdateUserMutation,
    HttpError,
    UpdateUserMutationVariables
  >({
    mutationMode: "optimistic",
    resource: "users",
    action: "edit",
    id: userId,
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });

  const { saveButtonProps, formProps, queryResult, form } = formValues as any;

  const userData = queryResult?.data?.data;

  const avatarUrl = userData?.avatarUrl;
  const name = userData?.name;

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Drawer
      onClose={closeModal}
      open={open}
      size={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
      destroyOnHidden
    >
      {open && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              backgroundColor: "#fff",
            }}
          >
            <Text strong>Account Settings</Text>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => closeModal()}
            />
          </div>
          <Spin spinning={queryResult?.isLoading}>
            <div
              style={{
                padding: "16px",
              }}
            >
              <Card>
                <Form {...formProps} form={form} layout="vertical">
                  <CustomAvatar
                    shape="square"
                    src={avatarUrl}
                    name={getNameInitials(name || "")}
                    style={{
                      width: 96,
                      height: 96,
                      marginBottom: "24px",
                    }}
                  />
                  <Form.Item label="Name" name="name">
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item label="Phone" name="phone">
                    <Input placeholder="Timezone" />
                  </Form.Item>
                </Form>
                <SaveButton
                  {...saveButtonProps}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                  }}
                />
              </Card>
            </div>
          </Spin>
        </>
      )}
    </Drawer>
  );
};

export default AccountSettings;
