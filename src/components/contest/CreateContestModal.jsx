import React, { useContext, useState } from "react";
import { NearContext } from "../../context/near";
import { Input } from "../Form";
import { Modal } from "../Modal";

export const CreateContestModal = ({ showModal, setShowModal }) => {
  const near = useContext(NearContext);

  const [loading, isLoading] = useState(false);
  const [title, setTitle] = useState();
  const [entryFee, setEntryFee] = useState();
  const [size, setSize] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleCreate = async () => {
    isLoading(true);
    await near.mainContract.createContest({
      title: title,
      entry_fee: entryFee,
      size: size,
      start_time: startTime,
      end_time: endTime,
      image: "", // temp  solution
    });
    setShowModal(false);
    isLoading(false);
  };

  return (
    <Modal
      title={"Create Contest"}
      showModal={showModal}
      setShowModal={setShowModal}
      onSubmit={handleCreate}
      loading={loading}
    >
      <div className="block p-6">
        <div className="form-group mb-6">
          <Input
            placeholder="Contest Title"
            val={title}
            handleChange={setTitle}
          />
        </div>
        <div className="form-group flex mb-6 space-x-4">
          <Input
            placeholder="Number of participants"
            val={size}
            handleChange={setSize}
          />
          <Input
            type="number"
            min={0}
            placeholder="Entry Fee"
            val={entryFee}
            handleChange={setEntryFee}
          />
        </div>
        <div className="form-group mb-6">
          <Input
            type="datetime-local"
            val={startTime}
            handleChange={setStartTime}
          />
          <Input
            type="datetime-local"
            min={startTime}
            val={endTime}
            handleChange={setEndTime}
          />
        </div>
      </div>
    </Modal>
  );
};
