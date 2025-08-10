import Input from "~/components/form/input/InputField";
import Label from "~/components/form/Label";
import Button from "~/components/ui/button/Button";
import { Modal } from "~/components/ui/modal";
import { useModal } from "~/hooks/useModal";

interface OrderCreateModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function OrderCreateModal(props: OrderCreateModalProps) {
  const { title, isOpen, onClose } = props;
  const { closeModal } = useModal();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    console.log(title);
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create Order
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Country</Label>
                <Input type="text" value="United States" />
              </div>

              <div>
                <Label>City/State</Label>
                <Input type="text" value="Arizona, United States." />
              </div>

              <div>
                <Label>Postal Code</Label>
                <Input type="text" value="ERT 2489" />
              </div>

              <div>
                <Label>TAX ID</Label>
                <Input type="text" value="AS4568384" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default OrderCreateModal;
