export class Comment {
  id: string; // uuid v4
  content: string;
  articleId: string; // refers to Article
  authorId: string | null; // refers to User
  createdAt: number; // timestamp of creation

  constructor(comment: Comment) {
    Object.assign(this, comment);
  }
}
