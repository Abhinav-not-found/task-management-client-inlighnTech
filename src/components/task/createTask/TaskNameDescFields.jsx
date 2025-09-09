const TaskNameDescFields = ({ name, setName, desc, setDesc }) => {
  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type='text'
        placeholder='Name'
        className='my-2 placeholder:text-stone-400 outline-none w-full'
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder='Description'
        className='placeholder:text-stone-400 w-full resize-none outline-none'
      />
    </>
  );
};

export default TaskNameDescFields;
