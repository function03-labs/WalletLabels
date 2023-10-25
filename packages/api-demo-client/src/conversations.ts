import { subDays, format } from 'date-fns'

export const getConversations = () => {
  return { conversations }
}

export const getConversation = (id: string) => {
  const conversation = conversations.find((c) => c.id === id)
  return conversation ? { conversation } : undefined
}

const date = new Date()

const conversations = [
  {
    id: '1',
    subject: 'Issue with account login',
    excerpt:
      "Hi, I'm having trouble logging into my account. Can you please help me reset my password?",
    name: 'John Smith',
    createdAt: date.toISOString(),
  },
  {
    id: '2',
    subject: 'Request for upgrade',
    excerpt:
      "Hi, I'm interested in upgrading my subscription to your product to access more features. Could you provide more information on the available options?",
    name: 'George Johnson',
    createdAt: `${format(subDays(date, 1), 'yyyy-MM-dd')} 16:25:00`,
  },
  {
    id: '3',
    subject: 'Request for refund',
    excerpt:
      "Dear support team, I'm not satisfied with your product and would like to request a refund. Can you please assist me with the process?",
    name: 'Mary Smith',
    createdAt: `${format(subDays(date, 1), 'yyyy-MM-dd')} 09:25:00`,
  },
  {
    id: '4',
    subject: 'Billing question',
    excerpt:
      'Hello, I noticed an error on my most recent invoice. Can you please help me resolve this issue?',
    name: 'Emily Johnson',
    createdAt: `${format(subDays(date, 2), 'yyyy-MM-dd')} 14:45:00`,
  },
  {
    id: '5',
    subject: 'Product feature request',
    excerpt:
      'Hi, I love using your product, but I wish it had the ability to schedule recurring tasks. Is this something you could consider adding?',
    name: 'Mark Lee',
    createdAt: `${format(subDays(date, 2), 'yyyy-MM-dd')} 10:30:00`,
  },
  {
    id: '6',
    subject: 'Technical issue',
    excerpt:
      "Dear support team, I'm experiencing an error message when I try to use your app. Can you please assist me in resolving this issue?",
    name: 'Sophia Davis',
    createdAt: `${format(subDays(date, 3), 'yyyy-MM-dd')} 16:20:00`,
    readAt: date,
  },
  {
    id: '7',
    subject: 'Feedback on customer service',
    excerpt:
      'Hello, I wanted to provide some feedback on my recent experience with your customer service team. I was impressed by their responsiveness and helpfulness!',
    name: 'Daniel Kim',
    createdAt: `${format(subDays(date, 3), 'yyyy-MM-dd')} 12:05:00`,
    readAt: date,
  },
  {
    id: '8',
    subject: 'Difficulty using feature',
    excerpt:
      "Hi, I'm having trouble figuring out how to use the new reporting feature. Could you provide some guidance on how to get started?",
    name: 'Maggie Chen',
    createdAt: `${format(subDays(date, 3), 'yyyy-MM-dd')} 11:30:00`,
    readAt: date,
  },
  {
    id: '9',
    subject: 'Cancel subscription request',
    excerpt:
      'Dear support team, I would like to cancel my subscription to your product. Can you please help me with the process?',
    name: 'Tom Brown',
    createdAt: `${format(subDays(date, 4), 'yyyy-MM-dd')} 17:00:00`,
  },
  {
    id: '10',
    subject: 'Inquiry about new feature',
    excerpt:
      'Hello, I saw that you recently released a new feature for your product. Could you provide more information on how it works and how I can start using it?',
    name: 'Lisa Nguyen',
    createdAt: `${format(subDays(date, 4), 'yyyy-MM-dd')} 08:45:00`,
  },
  {
    id: '11',
    subject: 'Issue with mobile app',
    excerpt:
      "Hi, I'm having trouble using your app on my mobile device. Can you please help me troubleshoot the issue?",
    name: 'Ryan Jones',
    createdAt: `${format(subDays(date, 5), 'yyyy-MM-dd')} 15:10:00`,
    readAt: date,
  },
  {
    id: '12',
    subject: 'Request for product demo',
    excerpt:
      "Dear sales team, I'm interested in learning more about your product and would like to request a demo. Could you please provide more information on scheduling a demo?",
    name: 'Emma Davis',
    createdAt: `${format(subDays(date, 5), 'yyyy-MM-dd')} 11:20:00`,
    readAt: date,
  },
  {
    id: '13',
    subject: 'Trouble with data import',
    excerpt:
      "Hello, I'm having trouble importing my data into your product. Could you provide some guidance on how to troubleshoot this issue?",
    name: 'David Kim',
    createdAt: `${format(subDays(date, 5), 'yyyy-MM-dd')} 09:15:00`,
    readAt: date,
  },
  {
    id: '14',
    subject: 'Feedback on product design',
    excerpt:
      'Hi, I wanted to provide some feedback on the design of your product. While it looks great, I find some of the UI elements confusing to use. Could you consider making some improvements to the design?',
    name: 'Alex Rodriguez',
    createdAt: `${format(subDays(date, 7), 'yyyy-MM-dd')} 13:25:00`,
    readAt: date,
  },
  {
    id: '15',
    subject: 'Request for customization',
    excerpt:
      'Dear support team, I would like to customize certain features of your product to better fit my needs. Could you provide more information on how I can do this?',
    name: 'Sara Johnson',
    createdAt: `${format(subDays(date, 7), 'yyyy-MM-dd')} 10:30:00`,
    readAt: date,
  },
  {
    id: '16',
    subject: 'Issue with integration',
    excerpt:
      "Hello, I'm having trouble integrating your product with another tool that I use. Could you provide some guidance on how to troubleshoot this issue?",
    name: 'Peter Lee',
    createdAt: `${format(subDays(date, 8), 'yyyy-MM-dd')} 14:45:00`,
    readAt: date,
  },
  {
    id: '17',
    subject: 'Issue with account settings',
    excerpt:
      "Dear support team, I'm having trouble updating my account settings in your product. Can you please assist me in resolving this issue?",
    name: 'Emma Davis',
    createdAt: `${format(subDays(date, 9), 'yyyy-MM-dd')} 12:05:00`,
    readAt: date,
  },
  {
    id: '18',
    subject: 'Request for onboarding',
    excerpt:
      "Hello, I'm a new user of your product and would like some assistance in getting started. Could you provide more information on your onboarding process?",
    name: 'Jack Wilson',
    createdAt: `${format(subDays(date, 9), 'yyyy-MM-dd')} 10:30:00`,
    readAt: date,
  },
  {
    id: '19',
    subject: 'Difficulty using API',
    excerpt:
      "Hi, I'm having trouble figuring out how to use your API. Could you provide some guidance on how to get started?",
    name: 'Sophia Brown',
    createdAt: `${format(subDays(date, 10), 'yyyy-MM-dd')} 17:00:00`,
    readAt: date,
  },
  {
    id: '20',
    subject: 'Issue with email notifications',
    excerpt:
      "Dear support team, I'm not receiving email notifications from your product. Can you please help me troubleshoot this issue?",
    name: 'Jason Kim',
    createdAt: `${format(subDays(date, 10), 'yyyy-MM-dd')} 08:45:00`,
    readAt: date,
  },
]
