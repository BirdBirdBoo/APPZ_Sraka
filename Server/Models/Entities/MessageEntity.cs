﻿using System.ComponentModel.DataAnnotations;

namespace Server.Models.Entities;

public enum MessageType
{
    Simple,
    Annotation
}

public class MessageEntity
{
    [Key]
    public int Id { get; set; }
    public MessageType MessageType { get; set; }
    public UserId Sender { get; set; } 
    public UserId Receiver { get; set; }
    public DateTime Send { get; set; }
    public string Text { get; set; } = null!;
}
