const connection = require('../database/connection');


module.exports = {
	// Para listar tasks do usuario
	async index(request, response) {
        const user_id = request.headers.authorization;

        const tasks = await connection('tasks')
            .where('user_id',user_id)
            .select('*');

        return response.json(tasks);
	},

	async create( request, response ) {
		const {name, description, difficulty} = request.body;
		const user_id = request.headers.authorization;

		if (name.length < 4 || description.length < 10 || difficulty.length < 4){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		const [id] = await connection('tasks').insert({
			name,
			description,
			difficulty,
			user_id,
		});

	return response.json({ id });
	},

	async update( request, response ) {
		const { id } = request.params;
		const {name, description, difficulty, concluded} = request.body;
		const user_id = request.headers.authorization;

		if (name.length < 4 || description.length < 10 || difficulty.length < 4){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		const task = await connection('tasks')
		.where('id', id)
		.select('user_id')
		.first();

		if( task.user_id != user_id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		await connection('tasks').where('id', id).update({
			'name': name,
			'description': description,
			'difficulty':difficulty,
			'concluded':concluded


		});

		return response.status(200).send();

	},

	async delete(request, response) {
		const { id } = request.params;
		const user_id = request.headers.authorization;

		const task = await connection('tasks')
		.where('id', id)
		.select('user_id')
		.first();

		if( task.user_id != user_id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}
	
		await connection('tasks').where('id', id).delete();

		return response.status(204).send();
	},

	async show(request, response) {
        const user_id = request.headers.authorization;
		const { id } = request.params;
        const task = await connection('tasks')
            .where({
				'user_id':user_id,
				'id': id})
			.select('*')
			.first();

        return response.json(task);
	},
};