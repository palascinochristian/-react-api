import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });

  const [recipesList, setRecipeList] = useState([]);

  const handleFormField = (fieldName, value) => {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
  };

  const addNewRecipe = (e) => {
    e.preventDefault();
    setRecipeList((current) => [...current, formData]);
    setFormData({
      title: "",
      content: "",
      image: "",
      tags: "",
    });
  };

  const deleteRecipe = (recipeToDelete) => {
    setRecipeList((current) =>
      current.filter((recipe) => recipe !== recipeToDelete)
    );
  };

  return (
    <>
      <div className="container">
        <div className="recipeList">
          {recipesList.map((recipe, index) => {
            return (
              <>
                <div className="recipe">
                  <h2 className="recipe-title">{recipe.title}</h2>
                  <button onClick={() => deleteRecipe(recipe)}>🗑️</button>
                </div>
                {recipe.content ? (
                  <div className="recipe-content">
                    {recipe.content}
                    <div className="recipe-image">
                      <img src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="recipe-tags">Tags: {recipe.tags}</div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
          <form onSubmit={addNewRecipe}>
            <label htmlFor="title">Nome ricetta:</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                handleFormField("title", e.target.value);
              }}
            />
            <label htmlFor="content">Descrizione</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => {
                handleFormField("content", e.target.value);
              }}
            />
            <label htmlFor="author">Immagine:</label>
            <input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) => {
                handleFormField("image", e.target.value);
              }}
            />
            <label htmlFor="tags">Scegli categoria:</label>
            <select
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={(e) => handleFormField("tags", e.target.value)}
            >
              <option value="Dolce">Dolce</option>
              <option value="Salato">Salato</option>
              <option value="Vegetariano">Vegetariano</option>
            </select>
            <button type="submit">Aggiungi</button>
          </form>
        </div>
      </div>
    </>
  );
}
