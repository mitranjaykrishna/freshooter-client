
export default function ButtonPrimary({
  label,
  loading,
  type = "button",
  handleOnClick,
}) {
  return (
    <button
      type={type}
      className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition disabled:opacity-50 cursor-pointer hover:bg-secondary"
      disabled={loading}
      onClick={handleOnClick}
    >
      {loading ? (
        <span>{`${label || "Submit"}...`}</span>
      ) : (
        <span>{label}</span> || <span>"Submit"</span>
      )}
    </button>
  );
}
