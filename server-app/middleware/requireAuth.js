"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    next();
};
exports.requireAuth = requireAuth;
