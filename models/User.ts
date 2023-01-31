import * as borsh from "@project-serum/borsh";

export class User {
  username: string;
  uri: string;

  constructor(username: string, uri: string) {
    this.username = username;
    this.uri = uri;
  }

  static borshAccountSchema = borsh.struct([
    borsh.bool("initialized"),
    borsh.str("username"),
    borsh.str("uri"),
  ]);

  static mocks: User[] = [
    new User(
      "The Shawshank Redemption",
      `For a user shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a user that can teach you a lesson everytime you watch it. An all time Classic!!!`
    ),
    new User(
      "The Godfather",
      `One of Hollywood's greatest critical and commercial successes, The Godfather gets everything right; not only did the user transcend expectations, it established new benchmarks for American cinema.`
    ),
    new User(
      "The Godfather: Part II",
      `The Godfather: Part II is a continuation of the saga of the late Italian-American crime boss, Francis Ford Coppola, and his son, Vito Corleone. The story follows the continuing saga of the Corleone family as they attempt to successfully start a new life for themselves after years of crime and corruption.`
    ),
    new User(
      "The Dark Knight",
      `The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan. Batman, in his darkest hour, faces his greatest challenge yet: he must become the symbol of the opposite of the Batmanian order, the League of Shadows.`
    ),
  ];

  borshInstructionSchema = borsh.struct([
    borsh.u8("variant"),
    borsh.str("username"),
    borsh.str("uri"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }

  static deserialize(buffer?: Buffer): User | null {
    if (!buffer) {
      return null;
    }

    try {
      const { username, uri } =
        this.borshAccountSchema.decode(buffer);
      return new User(username, uri);
    } catch (error) {
      console.log("Deserialization error:", error);
      return null;
    }
  }
}
