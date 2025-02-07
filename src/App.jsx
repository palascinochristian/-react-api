import { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function App() {
  const [recipesList, setRecipeList] = useState([]);

  //Richiesta API al backand per .json con array di oggetti (recipes)
  const fetchRecipes = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setRecipeList(res.data);
    });
  };

  //UseEffetc per eseguire la richiesta SOLO al caricamento della pagina
  useEffect(() => {
    fetchRecipes();
  }, []);

  //Inizializzo una variabile per il form
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });

  //Passo i valori inseriti nel form
  const handleFormField = (fieldName, value) => {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
  };

  //Aggiungo una nuova ricetta facendo una richiesta POST al server backend
  const addNewRecipe = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/posts", formData).then((res) => {
      setRecipeList((current) => [...current, res.data]);
      setFormData({
        title: "",
        content: "",
        image: "",
        tags: [],
      });
    });
  };

  // Elimino una delle ricette presenti facendo una richiesta DELETE al server backend
  const deleteRecipe = (recipeToDelete) => {
    axios
      .delete(`http://localhost:3001/posts/${recipeToDelete.id}`)
      .then(() => {
        setRecipeList((current) =>
          current.filter((recipe) => recipe.id !== recipeToDelete.id)
        );
      });
  };

  return (
    <>
      <div className="container">
        <div className="recipeList">
          {recipesList.map((recipe) => {
            return (
              <Fragment key={recipe.id}>
                <div className="recipe">
                  <h2 className="recipe-title">{recipe.title}</h2>
                  <button onClick={() => deleteRecipe(recipe)}>🗑️</button>
                </div>
                {recipe.content ? (
                  <div className="recipe-content">
                    {recipe.content}
                    <div className="recipe-image">
                      <img
                        src={
                          recipe.image.startsWith("http://") ||
                          recipe.image.startsWith("https://")
                            ? recipe.image
                            : `http://localhost:3001${recipe.image}`
                        }
                        alt={recipe.title}
                      />
                    </div>
                    <div className="recipe-tags">Tags: {recipe.tags}</div>
                  </div>
                ) : (
                  ""
                )}
              </Fragment>
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
              onChange={(e) => handleFormField("tags", [e.target.value])}
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
