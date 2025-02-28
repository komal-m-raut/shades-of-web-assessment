import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/wp-json/communities/all`,
      {
        headers: {
          Authorization: `Basic ${process.env.BASIC_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    );
  }
}
