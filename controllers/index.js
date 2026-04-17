const models = require("../database/models");

const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  console.log('getting users');
  try {
    const users = await models.User.findAll({
      include: [
      ]
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async ( req, res) => {
	console.log('deleting user...');
	try {
		const user = await models.User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found'});
		}
		await user.destroy();
		return res.status(200).json({ message : 'User deleted successfully'});
	} catch (error) {
		return res.status(500).json ({error : error.message });
	}
};

const update = async ( req, res) => {
  console.log('updating user...');
  try {
    const user = await models.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json ( { error: error.message } );
  }
};

const getUserById = async (req, res) => {
	console.log('getting user by id...');
	try  {
		const user = await models.User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json( { error: 'User not found'} );
		}
		return res.status(200).json( { user } );
	} catch (error) {
		return res.status(500).json( { error: error.message } );
	}
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  update,
  deleteUser
};
