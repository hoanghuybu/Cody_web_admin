import { message as messageRef } from "antd";
import { MessageInstance, MessageType } from "antd/es/message/interface";
import { ArgsProps } from "antd/lib/message";
import { Key } from "react";
import { ApiException } from "~/@core/dto";

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
declare type JointContent = ConfigContent | ArgsProps;
declare type ConfigOnClose = () => void;

export class ToastService implements MessageInstance {
  private navigate: (arg0: string) => void;
  initNavigation(navigate: (arg0: string) => void) {
    this.navigate = navigate;
  }

  info(
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose
  ): MessageType {
    return messageRef.info(content, duration, onClose);
  }
  success(
    content: JointContent = "DONE",
    duration?: ConfigDuration,
    onClose?: ConfigOnClose
  ): MessageType {
    return messageRef.success(content, duration, onClose);
  }
  error(
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose
  ): MessageType {
    return messageRef.error(content, duration, onClose);
  }
  warning(
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose
  ): MessageType {
    return messageRef.warning(content, duration, onClose);
  }
  loading(
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose
  ): MessageType {
    return messageRef.loading(content, duration, onClose);
  }

  open(args: ArgsProps): MessageType {
    return messageRef.open(args);
  }

  destroy(key?: Key): void {
    messageRef.destroy(key);
  }

  handleError(err: ApiException) {
    if (err.httpCode === 401) {
      this.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      if (this.navigate) {
        this.navigate("/login");
      }
      return;
    }
    let errors = "";

    try {
      if (err?.errors?.errors) {
        const parsedErrors =
          typeof err?.errors?.errors === "string"
            ? JSON.parse(err?.errors?.errors)
            : err?.errors?.errors;
        errors = Object.entries(parsedErrors)
          .map(([key, value]) => {
            const valueStr =
              typeof value === "object" ? JSON.stringify(value) : String(value);
            return `${key}: ${valueStr}`;
          })
          .join(", ");
      }

      if (errors) {
        this.error(errors);
      } else this.error(err.message || "Unknown");

    } catch (error) {
      console.error(error)
      this.error(JSON.stringify(err, null, 2));
    }
  }
}

export const toastService = new ToastService();
