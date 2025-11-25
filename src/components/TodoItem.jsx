function TodoItem({ id, todoName, todoDate, onDeleteClick }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium text-gray-800">{todoName}</div>
        <div className="text-sm text-gray-500">{todoDate}</div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
