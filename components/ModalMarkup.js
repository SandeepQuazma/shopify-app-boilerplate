import {Modal,FormLayout,TextField}from '@shopify/polaris';

function ModalMarkup({modalActive,toggleModalActive,supportSubject,handleSubjectChange,supportMessage,handleMessageChange}) {
    return (
        <Modal
        open={modalActive}
        onClose={toggleModalActive}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: toggleModalActive,
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={supportSubject}
              onChange={handleSubjectChange}
              autoComplete="off"
            />
            <TextField
              label="Message"
              value={supportMessage}
              onChange={handleMessageChange}
              autoComplete="off"
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
      );
}

export default ModalMarkup;