A.app({
    appName: "Task manager",
    appIcon: "book",
    onlyAuthenticated: true,
    menuItems: [
      {
        name: "Planning",
        entityTypeId: "Task",
        icon: "tasks"
      }, {
        name: "Board",
        entityTypeId: "TaskBoard",
        icon: "bars"
      }, {
        name: "Statuses",
        entityTypeId: "Status",
        icon: "sort"
      }
    ],
    entities: function(Fields) {
      return {
        Task: {
          fields: {
            summary: Fields.textarea("Summary").required(),
            dueDate: Fields.date("Due Date").required(),
            status: Fields.fixedReference("Status", "Status")
          },
          views: {
            TaskBoard: {
              customView: "board"
            }
          }
        },
        Status: {
          fields: {
            name: Fields.text("Name").required(),
            order: Fields.integer("Order").required()
          },
          sorting: [['order', 1]],
          referenceName: "name"
        }
      }
    }
  });
  