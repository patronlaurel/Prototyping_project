import db from "$lib/db";

export const actions = {
    categoryCreate: async ({request}) => {
        const data = await request.formData();
        let name = data.get("name");
        let beschreibung = data.get("desc");
console.log("data: ", name, beschreibung);
        db.createCategory({name, beschreibung});
        return {success: true};
    }
}