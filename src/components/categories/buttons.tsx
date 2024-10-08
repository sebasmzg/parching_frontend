type CategoryButtonProps = {
    category: { id: string; name: string };
    onClick: (categoryId: string) => void;
    isActive: boolean;
  };
  
  const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick, isActive }) => {
    return (
      <button
        onClick={() => onClick(category!.id)}
        style={{
          backgroundColor: isActive ? "#013b58" : "#D2DEEC",
          color: isActive ? "#ffffff" : "#013b58",
          padding: "10px 20px",
          margin: "5px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {category!.name}
      </button>
    );
  };
  
  export default CategoryButton;