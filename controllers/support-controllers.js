const SupportTicketModels = require("../models/TicketModels")

const getSupportTickets = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const SupportTickets = await SupportTicketModels.find({});

    res.json({
      message: { message: "Everything is Alright", type: "success" },
      data: SupportTickets,
    });
  } else {
    res.json({ message: { message: "failed", type: "failed" } });
  }
};
const createSupportTicket = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    if (await SupportTicketModels.findOne({ email: req.body.email })) {
      res.json({
        message: {
          message:
            "Each Email Can Submit Only 1 Request",
          type: "failed",
        },
      });
    } else {
      const newSupportTicket = new SupportTicketModels({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });

     await newSupportTicket.save();
      res.json({ message: { message: "SupportTicket Created", type: "success" } });
    }
  } else {
    res.json({
      message: {
        message: `Ther Is Something Wrong Operation Failure`,
        type: "failed",
      },
    });
  }
};
const deleteSupportTicket = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    await SupportTicketModels.findByIdAndDelete(req.body.id);
    const allSupportTickets = await SupportTicketModels.find({});
    res.json({
      message: {
        message: `Removed From Support Ticket List`,
        type: "success",
      },
      data: { data: allSupportTickets },
    });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

exports.getSupportTickets = getSupportTickets;
exports.createSupportTicket = createSupportTicket;
exports.deleteSupportTicket = deleteSupportTicket;
