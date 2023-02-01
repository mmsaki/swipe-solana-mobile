import * as borsh from "@project-serum/borsh";

export class User {
  username: string;
  uri: string;

  constructor(username: string, uri: string) {
    this.username = username;
    this.uri = uri;
  }

  static borshUserAccountSchema = borsh.struct([
    borsh.str("username"),
    borsh.str("uri"),
  ]);

  static mocks: User[] = [
    new User(
      "TheGodfather",
      "https://m.media-amazon.com/images/M/MV5BZTFiODA5NWEtM2FhNC00MWEzLTlkYjgtMWMwNzBhYzlkY2U3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
    ),
  ];

  borshInstructionSchema = borsh.struct([
    borsh.str("username"),
    borsh.str("uri"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this }, buffer);
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }

  static deserialize(buffer?: Buffer): User | null {
    if (!buffer) {
      return null;
    }

    try {
      const { username, uri } = this.borshUserAccountSchema.decode(buffer);
      return new User(username, uri);
    } catch (error) {
      console.log("Deserialization error:", error);
      return null;
    }
  }
}
