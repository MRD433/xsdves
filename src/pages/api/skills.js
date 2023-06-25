const config = require('../../../site.config.js');

export default async (req, res) => {
    const data = config.skills.data.map((skill) => {
        return {
            name: skill.name,
            src: skill.src,
        };
    });

    res.status(200).json(data)
};