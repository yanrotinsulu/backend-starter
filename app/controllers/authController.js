import model from '../data/models/index.js';
import { Op } from 'sequelize';
import hashHelper from '../helpers/hashes.js';

export default async function getUserIdByUsernameOrEmail(username, password) {
  let user = await model.user.findOne({
    where: {
      [Op.or]: [
        { username: username },
        { email: username }
      ]
    }
  });

  if (user) {
    let compareResult = await hashHelper.compareAsync(password, user.password);
    if (compareResult) {
      return user.id;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
