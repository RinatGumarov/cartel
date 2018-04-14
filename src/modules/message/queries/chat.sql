SELECT
  ch.id,
  ch.name,
  ch.photo_path,
  STRING_AGG(u.login, '$_$')       AS "login",
  string_agg(u.photo_path, '$_$') as "photos",
  ch.is_group
FROM (
       SELECT chats.id,
         chats.name,
         chats.is_group,
         chats.photo_path
       FROM chats
         INNER JOIN user_chats ON chats.id = user_chats.chat_id
         INNER JOIN users users ON user_chats.user_id = users.id AND users.id = :userId
       GROUP BY chats.id
     ) AS ch
  LEFT JOIN user_chats uch ON ch.id = uch.chat_id
  LEFT JOIN users u ON uch.user_id = u.id AND u.id <> :userId
GROUP BY ch.id, ch.name, ch.photo_path, ch.is_group