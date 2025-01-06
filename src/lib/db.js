import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { MONGODB_URI } from "$env/static/private"; // Load the URI from your .env file

const client = new MongoClient(MONGODB_URI);

await client.connect();
const db = client.db("Prototyping_projekt"); // Wähle die Datenbank aus

//////////////////////////////////////////
// Rezepte-Logik
//////////////////////////////////////////

async function getRecipes() {
  try {
    const recipes = await db.collection("Rezepte").find().toArray();
    return recipes.map((recipe) => ({
      ...recipe,
      _id: recipe._id.toString(),
      bild: `/images/${recipe.name.replace(/\s+/g, "")}.png`,
    }));
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
    throw error;
  }
}

async function getRecipe(id) {
  try {
    const recipe = await db.collection("Rezepte").findOne({ _id: new ObjectId(id) });
    if (!recipe) throw new Error("Rezept nicht gefunden.");
    return {
      ...recipe,
      _id: recipe._id.toString(),
      bild: `/images/${recipe.name.replace(/\s+/g, "")}.png`,
    };
  } catch (error) {
    console.error("Fehler beim Abrufen des Rezepts:", error);
    throw error;
  }
}

async function createRecipe(recipe) {
  try {
    const collection = db.collection('Rezepte');
    const recipeToInsert = {
      ...recipe,
      kochzeit: parseInt(recipe.kochzeit),
      kategorieID: parseInt(recipe.kategorieID),
    };
    const result = await collection.insertOne(recipeToInsert);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Fehler beim Erstellen des Rezepts:', error);
    throw error;
  }
}

async function deleteRecipe(id) {
  try {
    const collection = db.collection("Rezepte");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error("Rezept nicht gefunden");
    }
    return id;
  } catch (error) {
    console.error("Fehler beim Löschen des Rezepts:", error);
    throw error;
  }
}

//////////////////////////////////////////
// Kategorie-Logik
//////////////////////////////////////////

async function getCategories() {
  try {
    const categories = await db.collection("Kategorien").find().toArray();
    return categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
    }));
  } catch (error) {
    console.error("Fehler beim Abrufen der Kategorien:", error);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    const collection = db.collection("Kategorien");
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      throw new Error("Ungültige Kategorie-ID");
    }
    const result = await collection.deleteOne({ _id: numericId });
    if (result.deletedCount === 0) {
      throw new Error("Kategorie nicht gefunden");
    }
    return id;
  } catch (error) {
    console.error("Fehler beim Löschen der Kategorie:", error);
    throw error;
  }
}

async function getNextCategoryId() {
  try {
    const collection = db.collection("Kategorien");
    const lastCategory = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    return lastCategory.length > 0 ? lastCategory[0]._id + 1 : 1;
  } catch (error) {
    console.error("Fehler beim Generieren der nächsten ID:", error);
    throw error;
  }
}

async function createCategory(category) {
  try {
    const collection = db.collection("Kategorien");
    const newId = await getNextCategoryId();
    const categoryWithId = {
      ...category,
      _id: newId
    };
    await collection.insertOne(categoryWithId);
    return newId;
  } catch (error) {
    console.error("Fehler beim Erstellen der Kategorie:", error);
    throw error;
  }
}

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  getCategories,
  deleteCategory,
  createCategory,
  getNextCategoryId,
};
