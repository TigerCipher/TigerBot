/*
THIS COMMAND IS TEMPORARY AND WAS PURELY MEANT TO PLAY AROUND SOME WITH PERMISSIONS.
THIS BOT WILL NOT HAVE THE FEATURE TO CREATE ROLES, BUT WILL BE ABLE TO ADD EXISTING ROLES AS "MODERATOR" ROLES
 */


import {ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ColorResolvable} from "discord.js";

const data = new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Creates a new role")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addStringOption((option) => option.setName("name").setRequired(true).setDescription("The name of the role to create"))
    .addStringOption((option) => option.setName("predefined_color").setRequired(false).setDescription("Lets you pick from a list of predefined colors").addChoices(
        {
            name: "White",
            value: "White"
        },
        {
            name: "Blue",
            value: "Blue"
        },
        {
            name: "Red",
            value: "Red"
        },
        {
            name: "Green",
            value: "Green"
        },
    ))
    .addStringOption((option) => option.setName("custom_color").setRequired(false).setDescription("Lets you enter a custom HEX formatted color string"));

async function execute(interaction: ChatInputCommandInteraction) {
    const new_role = interaction.options.getString("name");
    const c1 = interaction.options.getString("predefined_color");
    const c2 = interaction.options.getString("custom_color");
    let color = "White" as ColorResolvable;
    if(c1 != null && c2 == null){
        color = c1 as ColorResolvable;
    }else if(c2 != null){
        color = c2 as ColorResolvable;
    }

    try {
        await interaction.guild!.roles.create({
            name: new_role!,
            color: color,
            //permissions: [] //PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.KickMembers
        });

        console.log(`New role to create: ${new_role}`);
        await interaction.reply(`${new_role} created`);
    }catch(error){
        await interaction.reply("The bot is missing permissions");
    }

}

export {data, execute};