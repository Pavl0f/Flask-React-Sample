// 最低文字数・使用可能な記号・パスワードポリシー（パスワードが条件に沿ってるか判定する用の正規表現）
export const password_minimum = "8"
export const password_kind = "!?#$%&@*_"
export const password_policy = new RegExp("[A-Za-z0-9"+password_kind+"]{"+password_minimum+",}")