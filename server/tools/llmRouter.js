import axios from 'axios';

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-hf';

export const classifyQuery = async (userQuery) => {
  const lowerQuery = userQuery.toLowerCase();

  if (lowerQuery.includes('weather') || lowerQuery.includes('temperature') || lowerQuery.includes('rain') || 
      lowerQuery.includes('sunny') || lowerQuery.includes('cloudy') || lowerQuery.includes('snow') ||
      lowerQuery.includes('climate') || lowerQuery.includes('wind')) {
    const cityMatch = userQuery.match(/(?:in|for|at)\s+([A-Za-z\s]+?)(?:\?|$|,)/i);
    const city = cityMatch ? cityMatch[1].trim() : 'unknown';
    return { type: 'weather', intent: 'get weather', params: { city } };
  }

  if (lowerQuery.includes('employee') || lowerQuery.includes('join') || lowerQuery.includes('salary') || 
      lowerQuery.includes('department') || lowerQuery.includes('engineer') || lowerQuery.includes('manager')) {
    if (lowerQuery.includes('join') || lowerQuery.includes('2024') || lowerQuery.includes('2023') || 
        lowerQuery.includes('month') || lowerQuery.includes('year')) {
      const yearMatch = userQuery.match(/\b(202[0-9])\b/);
      if (yearMatch) {
        return { type: 'database', intent: 'employees_joined_year', params: { year: parseInt(yearMatch[1]) } };
      }
      return { type: 'database', intent: 'employees_joined_last_month', params: {} };
    }
    if (lowerQuery.includes('department') || lowerQuery.includes('engineering') || lowerQuery.includes('product') ||
        lowerQuery.includes('analytics')) {
      const deptMatch = userQuery.match(/(?:in\s+)?(\w+)\s+(?:department|team)/i);
      const dept = deptMatch ? deptMatch[1] : 'Engineering';
      return { type: 'database', intent: 'employees_by_department', params: { department: dept } };
    }
    if (lowerQuery.includes('salary') || lowerQuery.includes('average')) {
      return { type: 'database', intent: 'average_salary', params: {} };
    }
  }

  if (lowerQuery.includes('order') || lowerQuery.includes('revenue') || lowerQuery.includes('sale')) {
    if (lowerQuery.includes('over') || lowerQuery.includes('above') || lowerQuery.includes('more than')) {
      const amountMatch = userQuery.match(/(?:over|above|more than|greater than)\s+\$?(\d+)/i);
      const amount = amountMatch ? parseInt(amountMatch[1]) : 500;
      return { type: 'database', intent: 'orders_over_amount', params: { amount } };
    }
    if (lowerQuery.includes('total') || lowerQuery.includes('revenue')) {
      return { type: 'database', intent: 'total_revenue', params: {} };
    }
  }

  return { type: 'general', intent: 'unknown', params: {} };
};

export const generateResponse = async (userQuery, toolResult) => {
  if (typeof toolResult === 'object' && toolResult.raw) {
    const queryType = toolResult.type;
    let response = '';

    if (queryType === 'employees_joined_last_month') {
      if (toolResult.data.length === 0) {
        return 'No employees joined last month.';
      }
      const names = toolResult.data.map(e => e.name).join(', ');
      return `${toolResult.data.length} employee(s) joined last month: ${names}.`;
    }

    if (queryType === 'employees_joined_year') {
      if (toolResult.data.length === 0) {
        return `No employees joined in ${toolResult.year}.`;
      }
      const names = toolResult.data.map(e => e.name).join(', ');
      return `${toolResult.data.length} employee(s) joined in ${toolResult.year}: ${names}.`;
    }

    if (queryType === 'orders_over_amount') {
      if (toolResult.data.length === 0) {
        return 'No orders found matching that criteria.';
      }
      const ordersStr = toolResult.data.map(o => `${o.orderId} ($${o.amount})`).join(', ');
      return `Found ${toolResult.data.length} order(s): ${ordersStr}.`;
    }

    if (queryType === 'employees_by_department') {
      if (toolResult.data.length === 0) {
        return 'No employees found in that department.';
      }
      const names = toolResult.data.map(e => e.name).join(', ');
      const dept = toolResult.data[0]?.department || 'the department';
      return `${toolResult.data.length} employee(s) in ${dept}: ${names}.`;
    }

    if (queryType === 'average_salary') {
      if (!toolResult.data || !toolResult.data.avgSalary) {
        return 'No salary data available.';
      }
      return `The average salary is $${Math.round(toolResult.data.avgSalary)}.`;
    }

    if (queryType === 'total_revenue') {
      if (!toolResult.data || !toolResult.data.totalRevenue) {
        return 'No revenue data available.';
      }
      return `Total revenue from all orders is $${toolResult.data.totalRevenue}.`;
    }
  }

  return toolResult;
};
