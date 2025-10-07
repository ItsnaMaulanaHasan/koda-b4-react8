function Input({ type, id, children, placeholder, error = {}, ...register }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {children}
      </label>
      <input
        className="p-3 border rounded-lg border-slate-300"
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {error[id] && (
        <p className="text-red-500 text-sm mt-1">{error[id].message}</p>
      )}
    </div>
  );
}

export default Input;
